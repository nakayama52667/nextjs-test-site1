import { useInView } from 'react-intersection-observer';

const Fade = ({ children, delay, fade }: any) => {
  const { ref, inView } = useInView({
    rootMargin: '-20%', // ref要素が現れてから20%過ぎたらinViewがtureになる。単位はpxと%のみ有効
    triggerOnce: true, // 最初の一度だけ実行
  });

  const on = {
    opacity: 1,
    transform: "translate(0px)",
    transitionDuration: "1s",
    transitionDelay: delay, // ディレイはプロップスにより各々独自のスタイルをもたせる。
  }

  const off = {
    opacity: 0,
    transform: fade === "up" ? "translateY(20px)" :
      fade === "down" ? "translateY(-20px)" :
        fade === "left" ? "translateX(20px)" :
          fade === "right" ? "translateX(-20px)" :
            "",
  };

  return (
    <>
      <div ref={ref} style={inView ? on : off}>
        {children}
      </div>
    </>
  );
}
export default Fade