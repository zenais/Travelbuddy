package com.codecool.zis.travel.buddy.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cities")
public class Cities {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "city-name")
    private String cityName;
    @Column(name = "country")
    private String country;
    @Column(name = "emoji")
    private String emoji;
    @Column(name = "date")
    private Instant date;
    @Column(name="notes")
    private String notes;
    @OneToOne
    private Position position;
    @OneToOne
    private User user;
    //TODO
}
