export const Divider = ({ moreClass }) => {
  return <hr className={`border-t border-gray-200 dark:border-gray-700 ${moreClass}`} />;
};
export const DivDivider = ({ moreClass }) => {
  return <div className={` ${moreClass}`} />;
};
export const ShadowDivider = ({ moreClass }) => {
  return <hr className={`border-t shadow dark:shadow-zinc-600 border-gray-300 dark:border-gray-700 ${moreClass}`} />;
};
export const RedDivider = ({ moreClass }) => {
  return <hr className={`border-t w-20 border-red-600 dark:border-red-600 my-5 h-1 bg-red-600 rounded ${moreClass}`} />;
};
export const PrimaryDivider = ({ moreClass }) => {
  return (
    <hr
      className={`border-t w-40 border-primary-700 dark:border-primary-700 my-3 h-1 bg-primary-700 rounded ${moreClass}`}
    />
  );
};
