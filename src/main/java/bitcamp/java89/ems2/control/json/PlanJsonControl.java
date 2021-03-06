package bitcamp.java89.ems2.control.json;

import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.java89.ems2.domain.Plan;
import bitcamp.java89.ems2.service.PlanService;

//@Controller
@RestController // 이 애노테이션을 붙이면, 스프링 설정 파일에 JSON 변환기 'MappingJackson2JsonView' 객체를 등록하지 않아도 된다.
public class PlanJsonControl {
  @Autowired ServletContext sc;
  @Autowired PlanService planService;
  
  @RequestMapping("/plan/list")
  public AjaxResult list(@RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="4") int pageSize, @RequestParam int sno) throws Exception {
    
    if (pageNo < 1) {
      pageNo = 1;
    }
    
    if (pageSize < 4 || pageSize > 30) {
      pageSize = 4;
    }

    List<Plan> list = planService.getList(pageNo, pageSize, sno);
    System.out.println("뭘까"+list);
    int totalCount = planService.getSize();
    
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("list", list);
    resultMap.put("totalCount", totalCount);
    
    return new AjaxResult(AjaxResult.SUCCESS, resultMap);
  }
  
  @RequestMapping("/plan/plmap")
  public AjaxResult planMap(@RequestParam int cono) throws Exception {
    System.out.println("/plan/plmap");
    Plan plan = planService.getOnePlan(cono);
    System.out.println(plan);
    return new AjaxResult(AjaxResult.SUCCESS, plan);
  }
  
  @RequestMapping("/planDetail/Count")
  public AjaxResult planCount(@RequestParam int sno) throws Exception {
    int totalCount = planService.getSize();
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("totalCount", totalCount);
    return new AjaxResult(AjaxResult.SUCCESS, resultMap);
  }
  
  @RequestMapping("/planDetail/list")
  public AjaxResult detailList(@RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="4") int pageSize, @RequestParam int sno) throws Exception {
    
    if (pageNo < 1) {
      pageNo = 1;
    }
    
    if (pageSize < 4 || pageSize > 12) {
      pageSize = 4;
    }

    List<Plan> list = planService.detailList(pageNo, pageSize, sno);
System.out.println(list);
    int totalCount = planService.getSize();
    System.out.println("멘토리스트"+totalCount);
    
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("list", list);
    resultMap.put("totalCount", totalCount);
    
    return new AjaxResult(AjaxResult.SUCCESS, resultMap);
  }
  
  

}





