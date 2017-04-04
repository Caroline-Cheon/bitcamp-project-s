package bitcamp.java89.ems2.dao;

import java.util.ArrayList;
import java.util.Map;

import bitcamp.java89.ems2.domain.Plan;

public interface PlanDao {
  int countAll() throws Exception;
  int boardSize(int eno) throws Exception;
  Plan getOnePlan(int cono) throws Exception;
  Plan getOne(int cono) throws Exception;
  ArrayList<Plan> boardList(Map<String,Object> paramMap) throws Exception;
  ArrayList<Plan> getList(Map<String,Object> paramMap) throws Exception;
  ArrayList<Plan> detailList(Map<String,Object> paramMap) throws Exception;
  int count(String email) throws Exception;
  int countByNo(int memberNo) throws Exception;
  
}
