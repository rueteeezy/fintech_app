package com.example.fintech.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.fintech.model.Subscriber;

public interface SubscriberRepository extends JpaRepository<Subscriber, Long> {
}
