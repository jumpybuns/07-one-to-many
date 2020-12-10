DROP TABLE IF EXISTS planets cascade;
DROP TABLE IF EXISTS moons;

CREATE TABLE planets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    size INTEGER,
    fact TEXT NOT NULL
);

CREATE TABLE moons (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    planet_id BIGINT REFERENCES planets(id)

)