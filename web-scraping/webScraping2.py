from playwright.sync_api import sync_playwright


#-------------------------------------------------------------------------------------------------------------- 
#curret problems: when going to new tab loading proper. regulate accepting cookies for first time new tab. format information properly. increase timeout accordingly. 


#next step: once u can get data from each listing on page1, go to the next page (increment page) and do the same till last available page is reached
 
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
            if index == 0:
                accept_cookies(2)

            new_page_link = listing.query_selector("a").get_attribute('href')
            page2.goto(f"https://www.wg-gesucht.de{new_page_link}")
            
            
            free_from = page2.wait_for_selector(".section_panel_value")
            address = page2.wait_for_selector(".section_panel_detail")
            room_details = page2.wait_for_selector(".pl15.mb15")
            num_ppl = page2.wait_for_selector(".mr5") #get title from this
            #continue_to_pics = page2.wait_for_selector(".cursor-pointer")
            # continue_to_pics.click()
           

            print(f"Free from: {free_from.inner_text()}\nAddress: {address.inner_text()}\nNum of People: {num_ppl.inner_text}\nRoom Details: {room_details.inner_text()}")
            
            
            input("press enter for next")
            # apartment_name = listing.query_selector(".truncate_title").inner_text()
            # apartment_rent = listing.query_selector(".col-xs-3").inner_text()
            # apartment_poster = listing.query_selector(".ml5").inner_text()
            
            # print(f"\n\nApartment Name: {apartment_name}\nApartment Rent: {apartment_rent}\nApartment Poster: {apartment_poster}\n\n")

        input("press enter to close")
    except Exception as e: 
        print(f"error {e}") #change this to 'return' at the end
    finally: 
        browser.close()




with sync_playwright() as playwright:
    run(playwright)
