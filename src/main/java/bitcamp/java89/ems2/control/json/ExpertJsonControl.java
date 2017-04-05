package bitcamp.java89.ems2.control.json;

import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.java89.ems2.domain.Mento;
import bitcamp.java89.ems2.domain.Plan;
import bitcamp.java89.ems2.service.MentoService;
import bitcamp.java89.ems2.service.PlanService;

@RestController
public class ExpertJsonControl {
  @Autowired ServletContext sc;
  @Autowired PlanService planService;
  @Autowired MentoService mentoService;
  
  @RequestMapping("/expert/board")
  public AjaxResult boardList(@RequestParam(defaultValue="1") int pageNo,
          @RequestParam(defaultValue="6") int pageSize, int eno) throws Exception {

    List<Plan> list = planService.boardList(pageNo, pageSize, eno);
    int totalCount = planService.boardSize(eno);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("list", list);
    resultMap.put("totalCount", totalCount);
    
    return new AjaxResult(AjaxResult.SUCCESS, resultMap);
  }
  
  @RequestMapping("/expert/getMentoInfo")
  public AjaxResult getMentoInfo(int eno) throws Exception {
    
    Mento mento = mentoService.getMentoInfo(eno);
    String[] areaList = mento.getSpecialArea().split(",");
    System.out.println("areaList"+areaList);

    
    return new AjaxResult(AjaxResult.SUCCESS, areaList);
    
    
  }
  
  
  
}





