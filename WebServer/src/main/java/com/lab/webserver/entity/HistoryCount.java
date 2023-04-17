package com.lab.webserver.entity;

public class HistoryCount {
    private String date;
    private int count;

    public HistoryCount(String date, int count) {
        this.date = date;
        this.count = count;
    }

    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public int getCount() {
        return count;
    }
    public void setCount(int count) {
        this.count = count;
    }
}
