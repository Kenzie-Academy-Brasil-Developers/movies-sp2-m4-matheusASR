CREATE TYPE "CATEGORIES" AS ENUM('Animação', 'Ficção', 'Romance', 'Ação', 'Comédia', 'Drama', 'Suspense')

CREATE TABLE IF NOT EXISTS movies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    category "CATEGORIES" NOT NULL,
    duration INTEGER NOT NULL,
    price INTEGER NOT NULL
);