import firebase_admin
from firebase_admin import credentials, firestore


cred = credentials.Certificate('web-scraping/roomlocator-bb890-firebase-adminsdk-1v4qe-a1246af188.json')
firebase_admin.initialize_app(cred)

# Access Firestore database
db = firestore.client()




def addData(city, apartment):
    try:
        db.collection(f'{city}').add(apartment)
        print("success")
    except Exception as e:
        print(f"ERROR {e}")




# webScraping2.main()

# for apartment in webScraping2.all_apartments:
#     addData(apartment)
