package org.example.cat2_back.repository;

import org.example.cat2_back.model.Cat;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CatRepository extends JpaRepository<Cat, Long> {
    List<Cat> findByNameContaining(String name);
}