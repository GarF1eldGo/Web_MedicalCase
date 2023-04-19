
import jieba
import pandas as pd
import numpy as np
import os
import torch
from sklearn.feature_extraction.text import CountVectorizer
import sys
import codecs

ROOT_DIR = 'Record Collections'
BASE_DIR = 'src/main/resources/static'
TARGET_FILE = BASE_DIR + '/ConsineHashMap.csv'


# 加载停用词表
def load_stopwords():
    stopwords = []
    file_name = BASE_DIR + '/hit_stopwords.txt'
    with open(file_name, 'r', encoding='utf-8') as f:
        for line in f.readlines():
            stopwords.append(line.strip())
    return stopwords


# 中文分词 + 去停用词
def chinese_word_segmentation(text, stopwords):
    seg_list = jieba.cut(text)
    seg_list = [word for word in seg_list if word not in stopwords]
    return seg_list


# 读取病历数据
def load_data(data=[], filename_list=[]):
    stopword = load_stopwords()
    for file in os.listdir(ROOT_DIR):
        file_name = os.path.join(ROOT_DIR, file)
        # 子文件夹
        if os.path.isdir(file_name):
            for sub_file in os.listdir(file_name):
                sub_file_name = os.path.join(file_name, sub_file)
                with open(sub_file_name, 'r', encoding='utf-8') as f:
                    text = f.read()
                    text = chinese_word_segmentation(text, stopword)
                    data.append(' '.join(text))
                    filename_list.append(sub_file_name)
        else:
            with open(file_name, 'r', encoding='utf-8') as f:
                text = f.read()
                text = chinese_word_segmentation(text, stopword)
                data.append(' '.join(text))
                filename_list.append(file_name)
    return data, filename_list


# 文本向量化
def build_vector(data):
    # tokenizer = BertTokenizer.from_pretrained('BERT/chinese_bert_wwm_ext_L-12_H-768_A-12/')
    # encoder = tokenizer.encode_plus(

    # )
    vectorizer = CountVectorizer()
    X = vectorizer.fit_transform(data)
    X_array = X.toarray()
    return X_array


# 计算所有文本之间的余弦相似度
def build_matrix(X_array):
    similarity_matrix = np.zeros((len(X_array), len(X_array)), dtype=np.float32)
    for i in range(len(X_array)):
        for j in range(len(X_array)):
            similarity_matrix[i][j] = torch.cosine_similarity(torch.tensor(X_array[i]).float(), torch.tensor(X_array[j]).float(), dim=0)

    return similarity_matrix


def calculate_consine(X_array):
    '''
    只计算第一个文本与其他文本的相似度
    '''
    similarity_matrix = np.zeros((len(X_array), len(X_array)), dtype=np.float32)
    for i in range(len(X_array)):
        similarity_matrix[0][i] = torch.cosine_similarity(torch.tensor(X_array[0]).float(), torch.tensor(X_array[i]).float(), dim=0)
    return similarity_matrix


def save_matrix(similarity_matrix, filename_list):
    '''
    key: 医案名称
    value: 相似医案的名称
    格式: 第一行为key,下面的行为value
    important: 假设了医案名称是唯一的
    '''
    hashmap = {}
    top_k = 5
    for i in range(len(similarity_matrix)):
        # 找到与当前医案最相似的top_k个医案
        top_k_index = np.argsort(similarity_matrix[i])[-top_k:]
        # 忽略自身
        top_k_index = top_k_index[top_k_index != i]
        filename = filename_list[i].split('\\')[-1].split('.txt')[0]
        hashmap[filename] = [filename_list[index].split('\\')[-1].split('.txt')[0] for index in top_k_index]

    # 保存hashmap
    df = pd.DataFrame(hashmap)
    df.to_csv(TARGET_FILE, index=False, encoding='utf-8')



def main():
    # 如果没有计算过相似度矩阵, 则计算并保存
    if not os.path.exists(TARGET_FILE):
        data, filename_list = load_data()
        X_array = build_vector(data)
        similarity_matrix = build_matrix(X_array)
        save_matrix(similarity_matrix, filename_list)

    # 读取csv文件
    df = pd.read_csv(TARGET_FILE, encoding='utf-8')
    # 构造hashmap
    hashmap = {}
    for i in range(df.shape[1]):
        # 第一行为key
        # 下面的行为value
        key = df.iloc[0, i]
        value = df.iloc[1:, i].dropna().tolist()
        hashmap[key] = value

    # 读取用户输入
    sys.stdin = codecs.getreader('utf-8')(sys.stdin.buffer)
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer)
    while True:
        user_input = sys.stdin.read()

        filename = user_input.split('###')[0]
        content = ''
        if len(user_input.split('###')) > 1:
            content = user_input.split('###')[1]

        if filename == 'exit':
            break
        if filename in hashmap.keys():
            output = (";").join(hashmap[filename])
            print(output)
        else:
            print(filename)
            print('result :{}'.format(filename in hashmap.keys()))
        # else:
        #     # 根据content计算新的相似度
        #     stopword = load_stopwords()
        #     content = chinese_word_segmentation(content, stopword)
        #     content = ' '.join(content)
        #     load_data(data=[content], filename_list=[filename])
        #     X_array = build_vector(data=[content])
        #
        #     similarity_matrix = calculate_consine(X_array)
        #     top_k_index = np.argsort(similarity_matrix[0])[-5:]
        #     top_k_index = top_k_index[top_k_index != 0]
        #     tmp_list = [filename_list[index].split('\\')[-1].split('.txt')[0] for index in top_k_index]
        #     output = (";").join(tmp_list)
        #     print(output)


if __name__ == '__main__':
    main()