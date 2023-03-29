package com.lab.webserver.configuration;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

public class Config {
    @Value("${elasticsearch.username}")
    public String elasticsearchUsername;

    @Value("${elasticsearch.password}")
    public String elasticsearchPassword;

    @Value("${elasticsearch.uris}")
    public String elasticsearchUris;

    @Bean
    public ElasticsearchClient elasticsearchClient(){
        String[] urlArray = elasticsearchUris.split(":");
        String url = urlArray[0];
        int port = Integer.parseInt(urlArray[1]);
        RestClient restClient = RestClient.builder(new HttpHost(url, port)).build();

        ElasticsearchTransport transport = new RestClientTransport(
                restClient, new JacksonJsonpMapper()
        );

        // 创建API客户端
        return new ElasticsearchClient(transport);
    }

}
