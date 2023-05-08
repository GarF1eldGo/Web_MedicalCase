package com.lab.webserver.entity;

import java.util.List;
import java.util.Map;

public class JsonDieaseClassification {
    public String name;
//    public Map<String, MedicalRecordNode> data;
    public List<MedicalRecordNode> children;

    public void setName(String name) {
        this.name = name;
    }
    public void setChildren(List<MedicalRecordNode> children) {
        this.children = children;
    }
    public String getName() {
        return name;
    }
    public List<MedicalRecordNode> getChildren() {
        return children;
    }
}


