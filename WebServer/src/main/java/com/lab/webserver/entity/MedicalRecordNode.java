package com.lab.webserver.entity;

import java.util.ArrayList;
import java.util.List;

public class  MedicalRecordNode {
    public String name;
    public Integer value;
    public String id;
    public List<MedicalRecordNode> children;

    public void addChildren(MedicalRecordNode medicalRecord){
        children.add(medicalRecord);
    }
    public void setChildren(List<MedicalRecordNode> children){
        this.children = children;
    }

    // 用于设置父节点
    public MedicalRecordNode( String name, Integer value){
        this.name = name;
        this.value = value;
        this.children = null;
    }

    // 用于设置子节点
    public MedicalRecordNode(String id, String name){
        this.id = id;
        this.name = name;
        this.value = 1;
        this.children = null;
    }

}