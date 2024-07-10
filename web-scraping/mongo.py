from pymongo import MongoClient
from playwright.sync_api import sync_playwright


def main():
    all_apartments = []
    for city in top_cities:
        print(f'printing for {city}')
        with sync_playwright() as playwright:
            apartments = run(playwright, city)
            all_apartments.extend(apartments)
    collection = connect_to_mongo('mongodb://localhost:27017/', 'my_database', 'my_collection')
    store(collection, all_apartments)
    print("Scraping and storing completed")

def connect_to_mongo(uri, database_name, collection_name):
    client = MongoClient(uri)
    db = client[database_name]
    collection = db[collection_name]
    return collection

def store(collection, data):
    collection.insert_many(data)

top_cities = [
   "Berlin", "Hamburg", "München", "Köln", "Frankfurt am Main", "Stuttgart", "Düsseldorf", "Dortmund",
    "Essen", "Leipzig", "Bremen", "Dresden", "Hannover", "Nürnberg", "Duisburg", "Bochum",
    "Wuppertal", "Bielefeld", "Bonn", "Mannheim", "Karlsruhe", "Wiesbaden", "Münster", "Augsburg",
    "Gelsenkirchen", "Mönchengladbach", "Braunschweig", "Chemnitz", "Kiel", "Aachen", "Halle (Saale)",
    "Magdeburg", "Freiburg im Breisgau", "Krefeld", "Lübeck", "Oberhausen", "Erfurt", "Mainz", "Rostock",
    "Kassel", "Hagen", "Saarbrücken", "Hamm", "Mülheim an der Ruhr", "Potsdam", "Ludwigshafen am Rhein", "Oldenburg",
    "Leverkusen", "Osnabrück", "Solingen", "Heidelberg", "Herne", "Neuss", "Darmstadt", "Paderborn",
    "Regensburg", "Ingolstadt", "Würzburg", "Wolfsburg", "Offenbach am Main", "Ulm", "Heilbronn", "Pforzheim",
    "Göttingen", "Bottrop", "Trier", "Recklinghausen", "Reutlingen", "Bremerhaven", "Koblenz",
    "Bergisch Gladbach", "Jena", "Remscheid", "Erlangen", "Moers", "Siegen", "Hildesheim",
    "Salzgitter", "Cottbus", "Kaiserslautern", "Gütersloh", "Schwerin", "Witten", "Gera", "Iserlohn",
    "Zwickau", "Düren", "Esslingen am Neckar", "Ratingen", "Marl", "Lünen", "Hanau", "Velbert", "Dessau-Roßlau",
    "Lüdenscheid", "Viersen", "Flensburg", "Gießen", "Lüneburg", "Worms", "Wilhelmshaven", "Neumünster",
    "Castrop-Rauxel", "Hattingen", "Sankt Augustin", "Grevenbroich", "Herten", "Troisdorf", "Celle"
]