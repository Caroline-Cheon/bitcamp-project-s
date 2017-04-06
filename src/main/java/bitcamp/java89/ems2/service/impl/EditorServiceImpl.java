package bitcamp.java89.ems2.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.ContentsHeaderDao;
import bitcamp.java89.ems2.dao.EditorDao;
import bitcamp.java89.ems2.dao.MemberDao;
import bitcamp.java89.ems2.dao.PlanDao;
import bitcamp.java89.ems2.domain.Editor;
import bitcamp.java89.ems2.service.EditorService;

@Service
public class EditorServiceImpl implements EditorService {
  @Autowired ContentsHeaderDao contentsDao;
  @Autowired EditorDao editorDao;
  @Autowired PlanDao planDao;
  @Autowired MemberDao memberDao;
  
  public int insert(Editor editor) throws Exception {
    return editorDao.insert(editor);
  }
  
  public int mindInsert(Editor editor) throws Exception {
    return editorDao.mindInsert(editor);
  }
  
  public int mindCopic(Editor editor) throws Exception {
    return editorDao.mindCopic(editor);
  }
}
















