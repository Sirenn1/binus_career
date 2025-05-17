import { Skeleton } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

import apiClient from "../../../config/api-client";
import { MasterDropdownReturn, Option } from "../../../interfaces/ITypes";
import { store } from "../../../store";
import { setError } from "../../../store/error/slice";
import MultiSelect from "../multiselect/MultiSelect";
import SingleSelect from "../singleselect/SingleSelect";
import { SelectAjaxProps } from "./SelectAjaxInterface";

const defaultApiTransform = (data: MasterDropdownReturn) =>
  data.listDropdown.map((item) => ({
    value: item.value,
    label: item.label,
    description: item.description,
  }));

function SelectAjax({
  name,
  value,
  onChange,
  apiEndpoint,
  dataTransform = defaultApiTransform,
  selectType,
  disabled,
  error,
}: SelectAjaxProps) {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOptions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(apiEndpoint);
      const transformedData = dataTransform(response.data);
      setOptions(transformedData);
    } catch {
      // Check if there's already an error message to avoid duplicates
      const errorState = store.getState().error;
      if (errorState.message && errorState.message.length > 0) return;

      store.dispatch(
        setError("Failed to fetch data from API, please try again later.")
      );
    } finally {
      setLoading(false);
    }
  }, [apiEndpoint, dataTransform]);

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  if (loading) {
    return <Skeleton variant="rectangular" height={40} />;
  }

  return selectType === "multiple" ? (
    <MultiSelect
      name={name}
      onChange={(e) => onChange(e as any)}
      data={options}
      disabled={disabled}
      error={error}
    />
  ) : (
    <SingleSelect
      name={name}
      onChange={(e) => onChange(e as any)}
      data={options}
      disabled={disabled}
      error={error}
      value={String(value)}
    />
  );
}

export default React.memo(SelectAjax);
