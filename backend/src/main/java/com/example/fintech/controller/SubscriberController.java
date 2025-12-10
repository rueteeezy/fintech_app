package com.example.fintech.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.fintech.model.Subscriber;
import com.example.fintech.repository.SubscriberRepository;

@RestController
@RequestMapping("/subscribers")
@CrossOrigin(origins = "*")
public class SubscriberController {

    @Autowired
    SubscriberRepository repo;

    @GetMapping
    public List<Subscriber> list() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable Long id) {
        return repo.findById(id)
                .map(s -> ResponseEntity.ok(s))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addSubscriber(@RequestBody Subscriber subscriber) {

        try {
            Subscriber saved = repo.save(subscriber);
            return ResponseEntity.status(201).body(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving subscriber: " + e.getMessage());
        }
    }
}
