from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By
import pytest
from selenium.webdriver.firefox.service import Service

@pytest.fixture
def load_site():
    options = Options()
    options.headless = True
    options.binary_location = "/usr/bin/firefox"  # força usar o Firefox do apt

    service = Service("/usr/local/bin/geckodriver")  # caminho correto do geckodriver instalado
    driver = webdriver.Firefox(service=service, options=options)

    try:
        driver.get("https://bolao-brasileirao.vercel.app/")
        yield driver
    finally:
        driver.quit()
    
def test_register_without_name(load_site):
    driver = load_site
   
    registerButton = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="root"]/div[2]/div/header/div[2]/div/button[2]')))
    registerButton.click()
    
    emailInput = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="email"]')))
    emailInput.send_keys("userTest@gmail.com")
    
    clubButton = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="root"]/div[2]/div/div/div[2]/form/div[3]/div/button[3]')))
    clubButton.click()
    
    passwordInput = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="password"]')))
    passwordInput.send_keys("123456")
    
    confirmedPasswordInput = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="confirmPassword"]')))
    confirmedPasswordInput.send_keys("123456")
    
    confirmRegisterButton = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,' //*[@id="root"]/div[2]/div/div/div[2]/form/button')))
    confirmRegisterButton.click()
    
    messageErrorIncompleteFields = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,' //*[@id="root"]/div[1]/ol/li')))
    
    assert messageErrorIncompleteFields is not None
    assert 'Campos incompletos' in messageErrorIncompleteFields.text
    
def test_register_without_email(load_site):
    driver = load_site
   
    registerButton = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="root"]/div[2]/div/header/div[2]/div/button[2]')))
    registerButton.click()
    
    emailInput = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="username"]')))
    emailInput.send_keys("userTest")
    
    clubButton = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="root"]/div[2]/div/div/div[2]/form/div[3]/div/button[3]')))
    clubButton.click()
    
    passwordInput = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="password"]')))
    passwordInput.send_keys("123456")
    
    confirmedPasswordInput = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="confirmPassword"]')))
    confirmedPasswordInput.send_keys("123456")
    
    confirmRegisterButton = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,' //*[@id="root"]/div[2]/div/div/div[2]/form/button')))
    confirmRegisterButton.click()
    
    messageErrorIncompleteFields = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,' //*[@id="root"]/div[1]/ol/li')))
    
    assert messageErrorIncompleteFields is not None
    assert 'Campos incompletos' in messageErrorIncompleteFields.text
   
def test_register_without_password(load_site):
    driver = load_site
   
    registerButton = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="root"]/div[2]/div/header/div[2]/div/button[2]')))
    registerButton.click()
    
    emailInput = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="username"]')))
    emailInput.send_keys("userTest")
    
    emailInput = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="email"]')))
    emailInput.send_keys("userTest@gmail.com")
    
    clubButton = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="root"]/div[2]/div/div/div[2]/form/div[3]/div/button[3]')))
    clubButton.click()
    
    confirmedPasswordInput = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="confirmPassword"]')))
    confirmedPasswordInput.send_keys("123456")
    
    confirmRegisterButton = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,' //*[@id="root"]/div[2]/div/div/div[2]/form/button')))
    confirmRegisterButton.click()
    
    messageErrorIncompleteFields = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,' //*[@id="root"]/div[1]/ol/li')))
    
    assert messageErrorIncompleteFields is not None
    assert 'Campos incompletos' in messageErrorIncompleteFields.text
    
def test_register_without_confirmedPassword(load_site):
    driver = load_site
   
    registerButton = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="root"]/div[2]/div/header/div[2]/div/button[2]')))
    registerButton.click()
    
    emailInput = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="username"]')))
    emailInput.send_keys("userTest")
    
    emailInput = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="email"]')))
    emailInput.send_keys("userTest@gmail.com")
    
    clubButton = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="root"]/div[2]/div/div/div[2]/form/div[3]/div/button[3]')))
    clubButton.click()
    
    passwordInput = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="password"]')))
    passwordInput.send_keys("123456")
    
    confirmRegisterButton = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,' //*[@id="root"]/div[2]/div/div/div[2]/form/button')))
    confirmRegisterButton.click()
    
    messageErrorIncompleteFields = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,' //*[@id="root"]/div[1]/ol/li')))
    
    assert messageErrorIncompleteFields is not None
    assert 'Campos incompletos' in messageErrorIncompleteFields.text
    
def test_register_with_password_less_than_6_characters(load_site):
    driver = load_site
   
    registerButton = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="root"]/div[2]/div/header/div[2]/div/button[2]')))
    registerButton.click()
    
    emailInput = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="username"]')))
    emailInput.send_keys("userTest")
    
    emailInput = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="email"]')))
    emailInput.send_keys("userTest@gmail.com")
    
    clubButton = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="root"]/div[2]/div/div/div[2]/form/div[3]/div/button[3]')))
    clubButton.click()
    
    passwordInput = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="password"]')))
    passwordInput.send_keys("123")
    
    confirmedPasswordInput = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="confirmPassword"]')))
    confirmedPasswordInput.send_keys("123")
    
    confirmRegisterButton = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,' //*[@id="root"]/div[2]/div/div/div[2]/form/button')))
    confirmRegisterButton.click()
    
    messageErrorLessPassword = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,' //*[@id="root"]/div[1]/ol/li')))
  
    assert messageErrorLessPassword is not None
    assert 'Senha muito curta' in messageErrorLessPassword.text
    
def test_register_with_password_and_confirmPassword_diferent(load_site):
    driver = load_site
   
    registerButton = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="root"]/div[2]/div/header/div[2]/div/button[2]')))
    registerButton.click()
    
    emailInput = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="username"]')))
    emailInput.send_keys("userTest")
    
    emailInput = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="email"]')))
    emailInput.send_keys("userTest@gmail.com")
    
    clubButton = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="root"]/div[2]/div/div/div[2]/form/div[3]/div/button[3]')))
    clubButton.click()
    
    passwordInput = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="password"]')))
    passwordInput.send_keys("1234567")
    
    confirmedPasswordInput = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,'//*[@id="confirmPassword"]')))
    confirmedPasswordInput.send_keys("1234568")
    
    confirmRegisterButton = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,' //*[@id="root"]/div[2]/div/div/div[2]/form/button')))
    confirmRegisterButton.click()
    
    messageErrorDiferentPassword = WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,' //*[@id="root"]/div[1]/ol/li')))
  
    assert messageErrorDiferentPassword is not None
    assert 'Senhas não conferem' in messageErrorDiferentPassword.text