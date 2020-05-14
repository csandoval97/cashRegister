from pymongo import MongoClient


client = MongoClient('mongodb://localhost')

db = client.test

db.my_collection.insert_one({"number":65}).inserted_id

for item in db.my_collection.find():
    print(item)


client.close()

