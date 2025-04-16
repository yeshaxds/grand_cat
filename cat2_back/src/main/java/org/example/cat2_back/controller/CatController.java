package org.example.cat2_back.controller;

import org.example.cat2_back.model.Cat;
import org.example.cat2_back.repository.CatRepository;
import org.example.cat2_back.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.annotation.PostConstruct;
import java.util.List;
import java.util.Random;

@CrossOrigin(origins = "*")  // 允许所有来源访问
@RestController
@RequestMapping("/api/cats")
public class CatController {

    @Autowired
    private CatRepository catRepository;

    @GetMapping
    public List<Cat> getAllCats(@RequestParam(required = false) String q) {
        if (q != null && !q.isEmpty()) {
            return catRepository.findByNameContaining(q);
        }
        return catRepository.findAll();
    }

    @PostMapping
    public Cat addCat(@RequestBody Cat cat) {
        return catRepository.save(cat);
    }

    @PutMapping("/{id}")
    public Cat updateCat(@PathVariable Long id, @RequestBody Cat catDetails) {
        Cat cat = catRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cat not found"));

        cat.setName(catDetails.getName());
        cat.setAppearance(catDetails.getAppearance());
        cat.setAge(catDetails.getAge());

        return catRepository.save(cat);
    }

    @DeleteMapping("/{id}")
    public void deleteCat(@PathVariable Long id) {
        catRepository.deleteById(id);
    }

    @PostConstruct
    public void initData() {
        if(catRepository.count() == 0) {  // 只有表为空时才初始化
            String[] names = {"小橘", "黑豆", "奶糖", "布丁", "花卷", "芝麻"};
            String[] appearances = {"橘猫", "黑猫", "白猫", "三花猫", "狸花猫", "奶牛猫"};

            Random random = new Random();
            for (int i = 0; i < 10; i++) {
                Cat cat = new Cat();
                cat.setName(names[random.nextInt(names.length)] + (i+1));
                cat.setAppearance(appearances[random.nextInt(appearances.length)]);
                cat.setAge(random.nextInt(10) + 1);
                catRepository.save(cat);
            }
        }
    }
}