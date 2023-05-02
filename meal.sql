CREATE TABLE "user" (
    "id" serial   NOT NULL,
    "name" text   NOT NULL,
    "age" integer   NOT NULL,
    "height" integer   NOT NULL,
    "weight" integer   NOT NULL,
    CONSTRAINT "pk_user" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "mealplan" (
    "id" serial   NOT NULL,
    "user_id" integer   NOT NULL,
    "week" integer   NOT NULL,
    CONSTRAINT "pk_mealplan" PRIMARY KEY (
        "id"
     ),
    CONSTRAINT "fk_mealplan_user" FOREIGN KEY ("user_id") REFERENCES "user" ("id")
);

CREATE TABLE "ingredients" (
    "id" serial   NOT NULL,
    "name" text   NOT NULL,
    "calories" integer   NOT NULL,
    CONSTRAINT "pk_ingredients" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "meal_ingredients" (
    "id" serial NOT NULL,
    "meal_id" integer NOT NULL,
    "ingredient_id" integer NOT NULL,
    "quantity" double precision NOT NULL,
    "unit" text NOT NULL,
    CONSTRAINT "pk_meal_ingredients" PRIMARY KEY (
        "id"
    ),
    CONSTRAINT "fk_meal_ingredients_meals" FOREIGN KEY ("meal_id") REFERENCES "meals" ("id"),
    CONSTRAINT "fk_meal_ingredients_ingredients" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients" ("id")
);

CREATE TABLE "ingredients" (
    "id" serial   NOT NULL,
    "name" text   NOT NULL,
    "calories" integer   NOT NULL,
    CONSTRAINT "pk_ingredients" PRIMARY KEY (
        "id"
     )
);