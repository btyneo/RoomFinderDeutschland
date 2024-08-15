from playwright.sync_api import sync_playwright
import re 
import time 
import pygame 
import os 
import json
import firestore 

#-------------------------------------------------------------------------------------------------------------- 
#curret problems: extract pics (after first listing). go to next page and rerun entire script till all pages are done.  


#next step: once u can get data from all pages with a single script run, implement captcha and translation api. (then add database and think about formatting)
 
#-------------------------------------------------------------------------------------------------------------- 


max_rent = "1500"
audio_file = r"web-scraping/alarm.mp3"
pygame.init()
pygame.mixer.init()
sound = pygame.mixer.Sound(audio_file)
def run(playwright, city_name):
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()
    
    # Set a global timeout of 60 seconds for all actions
    context.set_default_timeout(100000)
    page = context.new_page()
    def accept_cookies(page_num):
        if page_num == 1:
            cookies_accept_button = page.wait_for_selector(".cmpboxbtn.cmpboxbtnyes.cmptxt_btn_yes")
            cookies_accept_button.click()
        else: 
            cookies_accept_button = page2.wait_for_selector(".cmpboxbtn.cmpboxbtnyes.cmptxt_btn_yes")
            cookies_accept_button.click()
    
    page.goto("https://www.wg-gesucht.de/wg-zimmer-in-Erlangen.34.0.1.0.html")
    

    #it only asks for cookies once so just do this at the start or wherever new tab is. but for captcha itll search for it before running any page 
    

    try: 
        accept_cookies(1)
        # Interact with the input box
        # city_name = input("Enter city name: ")
        # max_rent = input("Enter max rent: ")

        input_box = page.wait_for_selector("#autocompinp")
        rent_box = page.wait_for_selector("#rMax")

    
        input_box.fill(city_name)
        rent_box.fill(max_rent)
        

        # Click the submit button
        submit_button = page.query_selector('.col-sm-12.col-md-3.text-right .filter_submit_button.btn.btn-md.wgg_blue.hidden-xs')
        submit_button.click()
        page_title = page.wait_for_selector(".headline.headline-default .hidden-xs")
        print(f"This is the page title {page_title.text_content()}")
        page.wait_for_selector(".wgg_card.offer_list_item")
        listings = page.query_selector_all(".wgg_card.offer_list_item")
        page_title = page.query_selector(".headline.headline-default")
        new_pages_available = True 
        # page_buttons = page.query_selector_all(".p0.simple-pagination")
        # for page in page_buttons:
        #     print(f"This is page {page}")
        current_page = page.url + "&pagination=1&pu="
        page_url_format = re.search("\d+\.\d+\.\d+\.\d+\.html", current_page).group()
        page_number = int(re.search("\d+\.\d+\.\d+\.(\d+)\.html", current_page).group(1))
        url_broken = current_page.split(page_url_format)
        page_url_format = page_url_format.split(f".{page_number}.html")
        formatted_url = (f"{url_broken[0]}{page_url_format[0]}.{str(page_number)}.html{url_broken[1]}")
       

        
        
        #get regex here 
        #split where regex is 
        #increment the regex 
        #.join() 
        page2 = context.new_page()
        while new_pages_available == True: 
            if page_number != 0: 
                page.goto(formatted_url)
                if page.title() ==  "Überprüfung" or page.title == "überprüfung":
                    sound.play()
                page_title = page.wait_for_selector(".headline.headline-default")
                if ": 0" in page_title.text_content():
                    print("NO MORE LISTINGS AVAILABLE!")
                    new_pages_available = False 
                    return
                page.wait_for_selector(".wgg_card.offer_list_item")
                listings = page.query_selector_all(".wgg_card.offer_list_item")
                
                
            page_number += 1
            formatted_url = (f"{url_broken[0]}{page_url_format[0]}.{str(page_number)}.html{url_broken[1]}")
            
            apartments = []
            for index, listing in enumerate(listings):
                try: 
                    if "vermietet" in listing.text_content(): 
                        continue
                    
                    try:
                        if listing.query_selector(".mdi.mdi-16px.mdi-vm.mdi-fw.mdi-lh.mdi-check-circle-outline"):
                            continue
                    except Exception as e:
                        pass 

                    new_page_link = listing.query_selector("a").get_attribute('href')
                    page2.goto(f"https://www.wg-gesucht.de{new_page_link}")
                    if page2.title() ==  "Überprüfung" or page2.title == "überprüfung":
                        sound.play()
                    # if index == 0 and page_number == 1 :
                    #     accept_cookies(2)
                    # #     # continue_to_pics = page2.wait_for_selector(".pull-right.mb20r")
                    # #     # continue_to_pics.click()

                    apartment = {
                    "listing_url": f"https://www.wg-gesucht.de{new_page_link}",
                    "free_from": listing.wait_for_selector(".col-xs-5.text-center").inner_text(),
                    "address": page2.wait_for_selector("#main_column > div:nth-child(6) > div > div > div > div:nth-child(1) > div > div > a > span").inner_text(),
                    "room_size": listing.query_selector(".col-xs-3.text-right").inner_text(),
                    #"room_details": page2.query_selector(".pl15.mb15").inner_text().split("Sprache/n:")[0],
                    # room_details = page2.wait_for_selector(".pl15.mb15")
                    "apartment_poster": listing.wait_for_selector(".ml5").inner_text(),
                    "apartment_rent": listing.query_selector(".col-xs-3").inner_text(),
                    "apartment_name": listing.query_selector(".truncate_title").inner_text(),
                    "other_details": page2.query_selector(".pl15.mb15").inner_text()[:-11]}
                    firestore.addData(city_name, apartment)

                    apartments.append(apartment)
                    print("Listing URL:", apartment["listing_url"])
                    print("Free from:", apartment["free_from"])
                    print("Address:", apartment["address"])
                    print("Room size:", apartment["room_size"])
                    print("Apartment poster:", apartment["apartment_poster"])
                    print("Apartment rent:", apartment["apartment_rent"])
                    print("Apartment name:", apartment["apartment_name"])
                    print(f"\n\nOther details: {apartment['other_details']}")
                    print("-" * 50)  # Separator between apartments
                    

                #    print(f"\n\nApartment Name: {apartment_name}\nApartment Rent: {apartment_rent}\nApartment Poster: {apartment_poster}\nFree from: {free_from}\nAddress: {address}\nRoom Details: {room_details}\n\n")
                except Exception as e:
                    print(f"Error in listing {index}: {e}")
            
        pygame.quit()   
    except Exception as e: 
        print(f"error {e}") #change this to 'return' at the end
    #finally: 
        #browser.close()
    return apartments


top_cities = [
   "Celle", "Hamburg", "München", "Köln", "Frankfurt am Main", "Stuttgart", "Düsseldorf", "Dortmund",
    "Berlin", "Leipzig", "Bremen", "Dresden", "Hannover", "Nürnberg", "Duisburg", "Bochum",
    "Wuppertal", "Bielefeld", "Bonn", "Mannheim", "Karlsruhe", "Wiesbaden", "Münster", "Augsburg",
    "Gelsenkirchen", "Mönchengladbach", "Braunschweig", "Chemnitz", "Kiel", "Aachen", "Halle (Saale)",
    "Magdeburg", "Freiburg im Breisgau", "Krefeld", "Lübeck", "Oberhausen", "Erfurt", "Mainz", "Rostock",
    "Kassel", "Hagen", "Saarbrücken", "Hamm", "Mülheim an der Ruhr", "Potsdam", "Ludwigshafen am Rhein", "Oldenburg",
    "Leverkusen", "Osnabrück", "Solingen", " qHeidelberg", "Herne", "Neuss", "Darmstadt", "Paderborn",
    "Regensburg", "Ingolstadt", "Würzburg", "Wolfsburg", "Offenbach am Main", "Ulm", "Heilbronn", "Pforzheim",
    "Göttingen", "Bottrop", "Trier", "Recklinghausen", "Reutlingen", "Bremerhaven", "Koblenz",
    "Bergisch Gladbach", "Jena", "Remscheid", "Erlangen", "Moers", "Siegen", "Hildesheim",
    "Salzgitter", "Cottbus", "Kaiserslautern", "Gütersloh", "Schwerin", "Witten", "Gera", "Iserlohn",
    "Zwickau", "Düren", "Esslingen am Neckar", "Ratingen", "Marl", "Lünen", "Hanau", "Velbert", "Dessau-Roßlau",
    "Lüdenscheid", "Viersen", "Flensburg", "Gießen", "Lüneburg", "Worms", "Wilhelmshaven", "Neumünster",
    "Castrop-Rauxel", "Hattingen", "Sankt Augustin", "Grevenbroich", "Herten", "Troisdorf", "Essen", "Rosenheim", "Aschaffenburg"
]

test_cities = [
     "Zwickau", "Düren", "Esslingen am Neckar", "Ratingen", "Marl", "Lünen", "Hanau", "Velbert", "Dessau-Roßlau"
]



    
def main():
#    all_apartments = []

    for city in test_cities:
        try: 
            print(f'printing for {city}')
            with sync_playwright() as playwright:
                run(playwright, city)
            #    all_apartments.extend(apartments)
        except Exception as e: 
            print(f"Error {e}")

main()