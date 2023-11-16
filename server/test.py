import pytest
from flask import Flask
from flask_testing import TestCase
from werkzeug.security import generate_password_hash
from app import app, db, User


class MyTest(TestCase):
    def create_app(self):
        app.config["TESTING"] = True
        app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
        return app

    def setUp(self):
        db.create_all()
        hashed_password = generate_password_hash("test", method="pbkdf2:sha256")
        user = User(username="test", password=hashed_password)
        db.session.add(user)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_register(self):
        response = self.client.post(
            "/register", json={"username": "test2", "password": "test2"}
        )
        data = response.get_json()
        self.assertEqual(response.status_code, 201)
        self.assertEqual(data["message"], "User registered successfully")

    def test_register_existing_user(self):
        response = self.client.post(
            "/register", json={"username": "test", "password": "test"}
        )
        data = response.get_json()
        self.assertEqual(response.status_code, 409)
        self.assertEqual(data["error"], "Username already exists")

    def test_login(self):
        response = self.client.post(
            "/login", json={"username": "test", "password": "test"}
        )
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data["message"], "Login successful")

    def test_login_invalid_credentials(self):
        response = self.client.post(
            "/login", json={"username": "test", "password": "wrong"}
        )
        data = response.get_json()
        self.assertEqual(response.status_code, 401)
        self.assertEqual(data["error"], "Invalid username or password")


if __name__ == "__main__":
    pytest.main()
