import pymongo

top_cities = [
    "Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart", "Dusseldorf", "Dortmund",
    "Essen", "Leipzig", "Bremen", "Dresden", "Hanover", "Nuremberg", "Duisburg", "Bochum",
    "Wuppertal", "Bielefeld", "Bonn", "Mannheim", "Karlsruhe", "Wiesbaden", "Munster", "Augsburg",
    "Gelsenkirchen", "Monchengladbach", "Braunschweig", "Chemnitz", "Kiel", "Aachen", "Halle",
    "Magdeburg", "Freiburg", "Krefeld", "Lubeck", "Oberhausen", "Erfurt", "Mainz", "Rostock",
    "Kassel", "Hagen", "Saarbrucken", "Hamm", "Mulheim", "Potsdam", "Ludwigshafen", "Oldenburg",
    "Leverkusen", "Osnabruck", "Solingen", "Heidelberg", "Herne", "Neuss", "Darmstadt", "Paderborn",
    "Regensburg", "Ingolstadt", "Wurzburg", "Wolfsburg", "Offenbach", "Ulm", "Heilbronn", "Pforzheim",
    "Gottingen", "Bottrop", "Trier", "Recklinghausen", "Reutlingen", "Bremerhaven", "Koblenz",
    "Bergisch Gladbach", "Jena", "Remscheid", "Erlangen", "Moers", "Siegen", "Hildesheim",
    "Salzgitter", "Cottbus", "Kaiserslautern", "Gutersloh", "Schwerin", "Witten", "Gera", "Iserlohn",
    "Zwickau", "Duren", "Esslingen", "Ratingen", "Marl", "Lunen", "Hanau", "Velbert", "Dessau-Rosslau",
    "Ludenscheid", "Viersen", "Flensburg", "Giessen", "Luneburg", "Worms", "Wilhelmshaven", "Neumunster",
    "Castrop-Rauxel", "Hattingen", "Sankt Augustin", "Grevenbroich", "Herten", "Troisdorf", "Celle",
    "Dorsten", "Sindelfingen", "Rheine", "Unna", "Kaufbeuren", "Villingen-Schwenningen", "Kempten",
    "Konstanz", "Fulda", "Marburg", "Lingen", "Lorrach", "Rastatt", "Viersen", "Russelsheim", "Lunen",
    "Weimar", "Schwabisch Gmund", "Kamen", "Neustadt an der Weinstrasse", "Ahlen", "Bamberg", "Rodgau",
    "Kerpen", "Nordhorn", "Bruhl", "Hilden", "Stolberg", "Wetzlar", "Bad Homburg vor"
]

def main():
    allListings = []
    for city in top_cities:


