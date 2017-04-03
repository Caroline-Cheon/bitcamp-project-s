package bitcamp.java89.ems2.control.json;

import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.UUID;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.java89.ems2.domain.Editor;
import bitcamp.java89.ems2.service.EditorService;
import bitcamp.java89.ems2.service.PlanService;

@RestController
public class EditorJsonControl {
  @Autowired ServletContext sc;
  @Autowired PlanService planService;
  @Autowired EditorService editorService;

  @RequestMapping("/expert/save")
  public AjaxResult editor(Editor editor) throws Exception {
    String binaryData = editor.getThumbnail();
    FileOutputStream stream = null;
    int rno=0;
    try {
      binaryData = binaryData.replaceAll("data:image/png;base64,", "");
      byte[] file = binaryData.getBytes(); //전송 되어 오는 데이터가 base64인코딩된 바이너리 데이터임 디코더 해줌
      String fileName = UUID.randomUUID().toString(); //랜덤 파일명 생성
      stream = new FileOutputStream(sc.getRealPath("/upload/"+ fileName + ".png"));
      stream.write(file);
      stream.flush();
      stream.close();
      
      System.out.println("editorService.insert() : " + editor.getContentsNo());
      editorService.insert(editor);
      System.out.println("editorService.insert() : " + editor.getContentsNo());
      editor.setThumbnail(fileName+".png");
      editorService.mindInsert(editor);
      rno = editor.getContentsNo();
      
      HashMap<String, Object> resultMap = new HashMap<>(); 
      resultMap.put("rno", rno);
    
      return new AjaxResult(AjaxResult.SUCCESS, resultMap);
    } catch (Exception e) {
      e.printStackTrace();
      return new AjaxResult(AjaxResult.FAIL, "실패");
    } finally {
      stream.close();
    }
  }
}





