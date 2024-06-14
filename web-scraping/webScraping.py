from selenium import webdriver
from selenium.webdriver.common.by import By 

#we will scrape data from 3 different websites.
wggesucht_base_link = "https://www.wg-gesucht.de/1-zimmer-wohnungen-in-Rosenheim.167.1.1.0.html"

#initializing selenium
driver = webdriver.Chrome()


#next step: implement for the 'accept all' pop up and captcha. then split each listing so that it has different variable for rent size last online city etc. 

# website1: wg-gescuht
def scrape_wggesucht(city=0, apartment_type=0, max_rent=0, earliest_moveindate="NaN.NaN.NaN"): #update inputs as you go along
    
    driver.get(wggesucht_base_link)
     #we are waiting 1.5s because maybe the website hasnt loaded yet properly 
    input("Please solve the CAPTCHA in the browser window, then press Enter to continue...")
    driver.implicitly_wait(4)
    current_page = []

    all_listings = driver.find_elements(By.CLASS_NAME, "wgg_card.offer_list_item  ")
    print(len(all_listings))
    for listing in all_listings:
        print(f"{listing}\n\n\n\n")



    driver.quit()

    

scrape_wggesucht()