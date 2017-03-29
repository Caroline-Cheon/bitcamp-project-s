package bitcamp.java89.ems2.domain;

public class Mento extends Member {
  private static final long serialVersionUID = 1L;
  
  protected int mentoNo;
  protected String specialArea;
  protected String detailArea;
  protected String career;
  
//  public int getMentoNo() {
//    return mentoNo;
//  }
//  public void setMentoNo(int mentoNo) {
//    this.mentoNo = mentoNo;
//  }
  public int getMentoNo() {
    return mentoNo;
  }
  public void setMentoNo(int mentoNo) {
    this.mentoNo = mentoNo;
  }
  public String getSpecialArea() {
    return specialArea;
  }
  public void setSpecialArea(String specialArea) {
    this.specialArea = specialArea;
  }
  public String getDetailArea() {
    return detailArea;
  }
  public void setDetailArea(String detailArea) {
    this.detailArea = detailArea;
  }
  public String getCareer() {
    return career;
  }
  public void setCareer(String career) {
    this.career = career;
  }
  
  @Override
  public String toString() {
    return "Mento [specialArea=" + specialArea + ", detailArea=" + detailArea + ", career=" + career + "]";
  }
}
