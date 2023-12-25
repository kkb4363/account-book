export default function useValidate() {
  const validateOnlyNumbers = (e) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = onlyNumbers;
  };

  return { validateOnlyNumbers };
}
