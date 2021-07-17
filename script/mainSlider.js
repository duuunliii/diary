var mainSlider = tns({
  container: '.main-slider',
  controls: false, //prev next 버튼 없애기
  navContainer: '.slider-nav-list',
  navAsThumbnails: true,
  arrowKeys: true, //방향키로 조정
  mouseDrag: true, //마우스 드래그
  preventScrollOnTouch: true, //모바일에서 드래그 했을 때 콘솔창에 뜨는 오류 없애줌
})
