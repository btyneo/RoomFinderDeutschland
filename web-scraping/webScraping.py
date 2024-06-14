from selenium import webdriver
from selenium.webdriver.common.by import By 
from selenium.webdriver.support.ui import WebDriverWait 

#we will scrape data from 3 different websites.
wggesucht_base_link = "https://www.wg-gesucht.de/1-zimmer-wohnungen-in-Rosenheim.167.1.1.0.html"


#initializing selenium
driver = webdriver.Chrome()

#-------------------------------------------------------------------------------------------------------------- 
#curret problem: it writes 'erlangen' in the city_input text box but even when it submits it, the site loaded is the rosenheim one
#check for captcha too 

#next step: implement for the 'accept all' pop up and captcha. then split each listing so that it has different variable for rent size last online city etc. 
#implement for 2 things ----> the inputs should be calculated for AND moving to next page 
#-------------------------------------------------------------------------------------------------------------- 

# website1: wg-gescuht
def scrape_wggesucht(city="erlangen", max_rent=0, earliest_moveindate="NaN.NaN.NaN"): #update inputs as you go along
    
    driver.get(wggesucht_base_link)
    listings_available = True 

     #we are waiting 1.5s because maybe the website hasnt loaded yet properly 
    while listings_available == True: 
        input("Please solve the CAPTCHA in the browser window, then press Enter to continue...")
        driver.implicitly_wait(4)

        #getting to the right page: this part of the code is taking user city input and loading correct page 
        city_input = driver.find_element(By.ID, "autocompinp")
        submit_button = driver.find_element(By.CLASS_NAME, "filter_submit_button")
        city_input.send_keys(city)
        city_input.click()
        driver.implicitly_wait(0.5)
        submit_button.click()
        # Wait for the new page to load with results for the specified city
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "wgg_card.offer_list_item")))



        current_page = [] #list of dictionary 
        

        all_listings = driver.find_elements(By.CLASS_NAME, "wgg_card.offer_list_item  ")

        
        for listing in all_listings:
            if "vermietet" in listing.text:
                listings_available = False 
            apartment_name = (listing.find_element(By.CLASS_NAME, "col-sm-12.flex_space_between")).text
            apartment_rent = (listing.find_element(By.CLASS_NAME, "col-xs-3")).text
            apartment_poster = (listing.find_element(By.CLASS_NAME, "col-xs-9")).text
            apartment_poster = apartment_poster[:len(apartment_poster)-18]
            print(f"\nApartment Name: {apartment_name}\nApartment Rent: {apartment_rent}\nApartment Poster: {apartment_poster}\n\n\n")
        
    
        





    driver.quit()


def scrape_each_page(driver):
    pass

    

scrape_wggesucht()