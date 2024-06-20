from playwright.sync_api import sync_playwright


#-------------------------------------------------------------------------------------------------------------- 
#curret problems: extract pics (after first listing). go to next page and rerun entire script till all pages are done.  


#next step: once u can get data from all pages with a single script run, implement captcha and translation api. (then add database and think about formatting)
 
#-------------------------------------------------------------------------------------------------------------- 

def run(playwright):
    
    def accept_cookies(page_num):
        if page_num == 1:
            cookies_accept_button = page.wait_for_selector(".cmpboxbtn.cmpboxbtnyes.cmptxt_btn_yes", timeout=90000)
            cookies_accept_button.click()
        else: 
            cookies_accept_button = page2.wait_for_selector(".cmpboxbtn.cmpboxbtnyes.cmptxt_btn_yes", timeout=90000)
            cookies_accept_button.click()
    browser = playwright.chromium.launch(headless=False)
    page = browser.new_page()
    page.goto("https://www.wg-gesucht.de/wg-zimmer-in-Erlangen.34.0.1.0.html")
    

    #it only asks for cookies once so just do this at the start or wherever new tab is. but for captcha itll search for it before running any page 
    accept_cookies(1)

    try: 
        # Interact with the input box
        city_name = input("Enter city name: ")
        max_rent = input("Enter max rent: ")

        input_box = page.wait_for_selector("#autocompinp")
        rent_box = page.wait_for_selector("#rMax")

    
        input_box.fill(city_name)
        rent_box.fill(max_rent)
        

        # Click the submit button
        submit_button = page.wait_for_selector('.col-sm-12.col-md-3.text-right .filter_submit_button.btn.btn-md.wgg_blue.hidden-xs')
        submit_button.click()

        apartment_name = ""
        apartment_rent = ""
        apartment_poster = ""

        page.wait_for_selector(".wgg_card.offer_list_item")
        listings = page.query_selector_all(".wgg_card.offer_list_item")
        page2 = browser.new_page()
        for index, listing in enumerate(listings):
            if "vermietet" in listing.text_content(): 
                break 
            new_page_link = listing.query_selector("a").get_attribute('href')
            page2.goto(f"https://www.wg-gesucht.de{new_page_link}")
            if index == 0:
                accept_cookies(2)
                # continue_to_pics = page2.wait_for_selector(".pull-right.mb20r")
                # continue_to_pics.click()

            
            listing_url = f"https://www.wg-gesucht.de{new_page_link}"
            free_from = listing.query_selector(".col-xs-5.text-center").inner_text()
            address = page2.wait_for_selector("#main_column > div:nth-child(6) > div > div > div > div:nth-child(1) > div > div > a > span").inner_text()
            room_details = page2.wait_for_selector(".pl15.mb15").inner_text().split("Sprache/n:")[0]
            # room_details = page2.wait_for_selector(".pl15.mb15")
            apartment_poster = listing.query_selector(".ml5").inner_text()
            apartment_rent = listing.query_selector(".col-xs-3").inner_text()
           
            apartment_name = listing.query_selector(".truncate_title").inner_text()
           
           

            print(f"\n\nApartment Name: {apartment_name}\nApartment Rent: {apartment_rent}\nApartment Poster: {apartment_poster}\nFree from: {free_from}\nAddress: {address}\nRoom Details: {room_details}\n\n")
            
            

        input("press enter to close")
    except Exception as e: 
        print(f"error {e}") #change this to 'return' at the end
    finally: 
        browser.close()




with sync_playwright() as playwright:
    run(playwright)
