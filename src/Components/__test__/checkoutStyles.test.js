import { renderHook } from "@testing-library/react";
import usecheckoutStyle from "../Util/useCheckoutStyles";

describe("usecheckoutStyle", () => {
  test("returns correct styles", () => {
    const { result } = renderHook(() => usecheckoutStyle());

    expect(result.current.typographyHeading).toEqual("makeStyles-typographyHeading-1");
    expect(result.current.card).toEqual("makeStyles-card-2");
    expect(result.current.editBox).toEqual("makeStyles-editBox-3");
    expect(result.current.addAddressBox).toEqual("makeStyles-addAddressBox-4");
  });
});