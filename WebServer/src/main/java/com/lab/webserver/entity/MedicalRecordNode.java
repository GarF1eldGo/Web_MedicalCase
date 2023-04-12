package com.lab.webserver.entity;

import java.util.List;

public class  MedicalRecordNode {
    public String id;
    public String name;
    public List<MedicalRecordNode> children;

    public void addChildren(MedicalRecordNode medicalRecord){
        children.add(medicalRecord);
    }
}