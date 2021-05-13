import React from 'react';
import throttle from 'lodash.throttle'

/**
 * @typedef {object} Props
 * @property {React.ReactNode} children
 * @property {() => void} fetchMore
 */

/** @type {React.VFC<Props>} */
const InfiniteScroll = ({ children, fetchMore }) => {
  const prevReachedRef = React.useRef(true);

  React.useEffect(() => {
    const handler = () => {
      // 最下部かどうかを確認する
      const hasReached = window.innerHeight + Math.ceil(window.scrollY) >= document.body.offsetHeight;
      // 画面最下部にスクロールしたタイミングで、登録したハンドラを呼び出す
      if (hasReached && !prevReachedRef.current) {
        fetchMore();
      }
      prevReachedRef.current = hasReached;
    };


    document.addEventListener('wheel', throttle(handler,200), { passive: true });
    document.addEventListener('touchmove', throttle(handler,200), { passive: true });
    document.addEventListener('resize', throttle(handler,200), { passive: true });
    document.addEventListener('scroll', throttle(handler,200),{ passive: true });
    return () => {
      document.removeEventListener('wheel', handler);
      document.removeEventListener('touchmove', handler);
      document.removeEventListener('resize', handler);
      document.removeEventListener('scroll', handler);
    };
  }, [fetchMore]);

  return <>{children}</>;
};

export { InfiniteScroll };
