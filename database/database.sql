-- Active: 1671803102561@@localhost@5432@driven17@public
CREATE DATABASE DRIVEN17;

CREATE TABLE USERS (
    ID SERIAL PRIMARY KEY,
    NAME TEXT NOT NULL,
    EMAIL TEXT NOT NULL UNIQUE,
    PASSWORD TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE URLS (
    "id" SERIAL PRIMARY KEY,
    "shortUrl" VARCHAR(8) NOT NULL,
    "url" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "visits" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);


ALTER TABLE URLS ADD CONSTRAINT "users_fk0" FOREIGN KEY ("userId") REFERENCES "users"(id);