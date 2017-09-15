package haitao.redisTest;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ExcelTest {
	public static void main(String[] args) throws Exception{
		String filePath = "E:\\co-drive\\e2e-v4.xls";
//		String filePath = "E:\\co-drive\\E2E TTS6.xlsx";
//		String filePath = "E:\\co-drive\\E2E TERM1.xlsx";
//		String filePath = "E:\\co-drive\\plans.xlsx";
		FileInputStream fin = new FileInputStream(new File(filePath));
//		HSSFWorkbook wb = new HSSFWorkbook(fin);
//		int i = wb.getNumberOfSheets();
//		while(i >= 0){
//			System.out.println(wb.getSheetName(i));
//			i--;
//		}
		Workbook wb = WorkbookFactory.create(fin);
		int i = wb.getNumberOfSheets() -1;
		while(i >= 0){
			String sheetName = wb.getSheetName(i);
			Sheet sheet = wb.getSheetAt(i);
			int rowNum = sheet.getLastRowNum() + 1;
			for(int j =0; j < rowNum; j++){
				Row row = sheet.getRow(j);
				for(int k =0; k <row.getLastCellNum(); k++){
					Cell cell = row.getCell(k);
					String value = null;
					if(cell.getCellType() == cell.CELL_TYPE_NUMERIC){
						value = String.valueOf(cell.getNumericCellValue());
					}else if(cell.getCellType() == cell.CELL_TYPE_FORMULA){
						value = cell.getCellFormula();
					}else{
						try{
							value = cell.getStringCellValue();
						}catch(NumberFormatException e){
							if(e.getMessage().equalsIgnoreCase("For input string: \"\"")){
								value = "";
							}else{
								e.printStackTrace();
							}
						}
					}
					System.out.println(sheetName + ":" + j + "-" + k + ">>" + value);
				}
			}
			i--;
		}
	}
}
