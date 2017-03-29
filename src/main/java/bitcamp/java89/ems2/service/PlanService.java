package bitcamp.java89.ems2.service;

import java.util.List;

import bitcamp.java89.ems2.domain.Plan;

public interface PlanService {
  int getSize() throws Exception;
  Plan getOne(int cono) throws Exception;
  int boardSize(int eno) throws Exception;
  List<Plan> boardList(int pageNo, int pageSize, int eno) throws Exception;
  List<Plan> getList(int pageNo, int pageSize, int sno) throws Exception;
  List<Plan> detailList(int pageNo, int pageSize, int sno) throws Exception;
  /*Student getDetail(int no) throws Exception;
  int add(Student student) throws Exception;
  int delete(int no) throws Exception;
  int update(Student student) throws Exception;*/
//  int getSize() throws Exception;
}
















