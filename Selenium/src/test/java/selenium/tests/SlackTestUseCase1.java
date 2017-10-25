package selenium.tests;

import static org.junit.Assert.*;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import io.github.bonigarcia.wdm.ChromeDriverManager;

public class SlackTestUseCase1 {

	private static WebDriver driver;
	
	@BeforeClass
	public static void setUp() throws Exception 
	{
		//driver = new HtmlUnitDriver();
		ChromeDriverManager.getInstance().setup();
		driver = new ChromeDriver();
		UtilityFunction();
	}
	
	@AfterClass
	public static void  tearDown() throws Exception
	{
		driver.close();
		driver.quit();
	}

	
    @Test
	public void useCase1HappyPath() throws InterruptedException
	{
		WebDriverWait wait = new WebDriverWait(driver, 30);

		// Test to add a checklist item in a card
		WebElement messageBot = driver.findElement(By.id("msg_input"));
		assertNotNull(messageBot);
		
		Actions actions = new Actions(driver);
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("@trellobot hi");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();
		Thread.sleep(4000);
		
		//trellobot responds back with a greeting
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//span[@class='message_body' and text() = 'How can I help you?']")));

		actions.sendKeys("open a card");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();
		Thread.sleep(3000);
		
		//trellobot asks the name of the card which needs to be opened
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//span[@class='message_body' and text() = 'What is the card name?']")));

		actions.sendKeys("Card1_NEW");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();
		Thread.sleep(4000);
		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//span[@class='message_body' and text() = '4) List checklist items']")));

		actions.sendKeys("List checklist items");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();
		Thread.sleep(5000);
		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//span[@class='message_body' and text() = 'C1_item3 | incomplete | 100475']")));

		WebElement msg = driver.findElement(
				By.xpath("//span[@class='message_body' and text() = 'C1_item3 | incomplete | 100475']"));
		assertNotNull(msg);
}

// Utility method to open the given webpage only once
	public static void UtilityFunction(){
		driver.get("https://seproject-workspace.slack.com/");
		
        // Wait until page loads and we can see a sign in button.
		WebDriverWait wait = new WebDriverWait(driver, 30);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("signin_btn")));

		// Find email and password fields for Slack login page
		WebElement email = driver.findElement(By.id("email"));
		WebElement pw = driver.findElement(By.id("password"));

		//type in slack's email address and password on the slack login page
		//email.sendKeys(System.getenv("SLACK_EMAIL_ID"));
		//pw.sendKeys(System.getenv("SLACK_PASSWORD"));

		email.sendKeys("se.project@mail.com");
		pw.sendKeys("promanbot");
		// Click
		WebElement signin = driver.findElement(By.id("signin_btn"));
		signin.click();

		// Wait until we go to general channel.
		wait.until(ExpectedConditions.titleContains("general"));

		// Switch to #bots channel and wait for it to load.
		driver.get("https://seproject-workspace.slack.com" + "/messages/trellobot");
		wait.until(ExpectedConditions.titleContains("trellobot"));
	}

}

