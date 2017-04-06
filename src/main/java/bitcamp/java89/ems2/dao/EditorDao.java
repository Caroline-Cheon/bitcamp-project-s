package bitcamp.java89.ems2.dao;

import bitcamp.java89.ems2.domain.Editor;

public interface EditorDao {
  int insert(Editor editor) throws Exception;
  int mindInsert(Editor editor) throws Exception;
  int mindCopic(Editor editor) throws Exception;
}
