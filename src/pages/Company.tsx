import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import ProductPlaceHolder from "@/assets/product-placeholder.png";
import { MotionList } from "@/components/common/MotionList";
import { useGetCompany } from "@/components/hooks/useGetCompany";
import { ImageUpload } from "@/components/pos/ImageUpload";
import { CompanyExpanded } from "@/types/expanded";
import styled from "@emotion/styled";
import {
  Card,
  Field,
  Input,
  Subtitle1,
  Title2,
  Toaster,
  tokens,
  useId,
} from "@fluentui/react-components";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingVerticalMNudge};
`;
const Container = styled.div`
  margin-top: ${tokens.spacingVerticalS};
  display: flex;
  gap: ${tokens.spacingVerticalM};

  & > div {
    flex: 1;
  }
`;

const CardStyled = styled(Card)`
  min-height: 72px;
  max-width: 100%;
  height: fit-content;
  box-shadow: ${({ theme }) => theme.shadow2};
  background: ${({ theme }) => theme.winBackground};
  padding: ${tokens.spacingHorizontalXXL};
  &:active,
  :hover {
    background: ${({ theme }) => theme.winBackgroundHover};
    box-shadow: ${({ theme }) => theme.shadow2};
  }
`;

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingVerticalXL};
`;

const Company = () => {
  const toasterId = useId("toaster");
  // const { dispatchToast } = useToastController(toasterId);

  const [company, setCompany] = useState<CompanyExpanded | undefined>(
    undefined
  );

  const { control } = useForm({
    mode: "onChange",
  });
  // const [values, setValues] = useState<{ [x: string]: any }>();
  // const debouncedValues = useDebounce(values, 1300);

  // const [file, setFile] = useState<File | null>(null);

  const { fetch } = useGetCompany({ requestKey: "company" });

  // watch((values) => {
  //   setValues(values);
  // });

  // const update = async () => {
  //   if (!values) return;
  //   const company = await fetch()
  //   await client
  //     ?.collection(Collections.Company)
  //     .update(company.id, {
  //       ...values,
  //       name: values.name || "Gourmandises & Compagnie",
  //       address: values.address || "GARDEN CITY - CHERAGA",
  //     })

  //   notify();
  // }

  // useEffect(() => {
  //   update();
  // }, [debouncedValues]);

  useEffect(() => {
    fetch().then((company) => setCompany(company));
  }, []);

  // const notify = () =>
  //   dispatchToast(
  //     <Toast>
  //       <ToastTitle>Modification enregistrées!</ToastTitle>
  //       <ToastBody>Vos modifications ont été effectuées avec succès</ToastBody>
  //     </Toast>,
  //     { intent: "success" }
  //   );

  // useEffect(() => {
  //   if (!company || !file) return;
  //   client?.collection(Collections.Company).update(company.id, { logo: file });
  // }, [file]);

  return (
    company && (
      <Wrap>
        <Title2>Informations</Title2>

        <MotionList>
          <Container>
            <CardStyled>
              <Subtitle1>Mettre à jour les informations</Subtitle1>
              <FormWrap>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={company?.name}
                  render={({ field, fieldState: { error } }) => (
                    <Field
                      label="Nom"
                      validationState={error ? "error" : "none"}
                      validationMessage={error?.message}>
                      <Input
                        autoComplete="nope"
                        size="large"
                        {...field}
                        readOnly
                      />
                    </Field>
                  )}
                />
                <Controller
                  name="phone"
                  control={control}
                  defaultValue={company?.phone}
                  render={({ field, fieldState: { error } }) => (
                    <Field
                      label="Téléphone"
                      validationState={error ? "error" : "none"}
                      validationMessage={error?.message}>
                      <Input
                        autoComplete="nope"
                        size="large"
                        {...field}
                        readOnly
                      />
                    </Field>
                  )}
                />
                <Controller
                  name="address"
                  control={control}
                  defaultValue={company?.address}
                  render={({ field, fieldState: { error } }) => (
                    <Field
                      label="Adresse"
                      validationState={error ? "error" : "none"}
                      validationMessage={error?.message}>
                      <Input
                        autoComplete="nope"
                        size="large"
                        {...field}
                        readOnly
                      />
                    </Field>
                  )}
                />
              </FormWrap>
            </CardStyled>
            <CardStyled>
              <Subtitle1>Mettre à jour le logo</Subtitle1>
              <ImageUpload
                hideLabel
                img={company?.imgUrl || ProductPlaceHolder}
                Trigger={<></>}
                setFile={() => {}}
              />
            </CardStyled>
          </Container>
        </MotionList>

        <Toaster toasterId={toasterId} />
      </Wrap>
    )
  );
};

export default Company;
