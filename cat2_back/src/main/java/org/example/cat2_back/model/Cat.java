package org.example.cat2_back.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.*;
@Entity
public class Cat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String appearance;
    private Integer age;

    // 构造方法
    public Cat() {}

    public Cat(String name, String appearance, Integer age) {
        this.name = name;
        this.appearance = appearance;
        this.age = age;
    }

    // Getter和Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAppearance() { return appearance; }
    public void setAppearance(String appearance) { this.appearance = appearance; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
}