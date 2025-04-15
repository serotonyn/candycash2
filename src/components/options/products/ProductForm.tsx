import { useEffect, useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import ProductPlaceHolder from "@/assets/product-placeholder.png";
import styled from "@emotion/styled";
import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
  Link,
  tokens,
} from "@fluentui/react-components";
import { ImageUpload } from "../../pos/ImageUpload";


// import { ImageUpload } from "../../pos/ImageUpload";

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingVerticalXL};
`;

const TwoCols = styled.div`
  display: flex;
  gap: ${tokens.spacingHorizontalXXL};
  & > div:first-of-type {
    flex: 2;
  }
  & > div:second-of-type {
    flex: 1;
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingVerticalXL};
`;

interface FormValues {
  name?: string;
  code?: string;
  category?: string;
  salePrice?: string;
  purchasePrice?: string;
}

export const ProductForm: React.FC<any> = ({
  text,
  open,
  setOpen,
  trigger,
  product,
  setProduct,
  onSubmitted,
  nextProductCode,
  refetchNextCode,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
    setValue,
  } = useForm<FormValues>();

  useEffect(() => {
    if (!nextProductCode) return;
    setValue("code", String(nextProductCode));
  }, [nextProductCode]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const d = Object.assign(data, file ? { image: file } : {});
      await onSubmitted(d);
      setOpen(false);
      // reset(product || defaultValues);
      reset({
        ...product,
        code: String(product?.code || nextProductCode),
        salePrice: String(product?.salePrice),
        purchasePrice: String(product?.purchasePrice),
      });
      await refetchNextCode?.();
    } catch (error) {
      console.log(error);
    }
  };

  const onCancel = () => {
    // reset(product || defaultValues);
    reset({
      ...product,
      code: String(product?.code || nextProductCode),
      salePrice: String(product?.salePrice),
      purchasePrice: String(product?.purchasePrice),
    });
    setProduct?.(undefined);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(_, { open }) => setOpen(open)}>
        <>{trigger}</>
        <DialogSurface
          mountNode={document.querySelector("#main")}
          style={{ transitionDuration: "var(--durationUltraFast)" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogBody>
              <DialogTitle>{text}</DialogTitle>
              <DialogContent>
                <FormWrap>
                  <TwoCols>
                    <Col>
                      <Controller
                        name="name"
                        control={control}
                        defaultValue={product?.name || ""}
                        rules={{ required: true }}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <Field
                              label="Nom"
                              validationState={error ? "error" : "none"}
                              validationMessage={error?.message}>
                              <Input
                                autoComplete="nope"
                                size="large"
                                contentAfter={<PromoButton aria-label="promo" onClick={() => {
                                  if (!field.value || field.value.includes("🔖")) return;
                                  setValue("name", field.value?.trim() + " 🔖");

                                }} />}
                                {...field}
                              />
                            </Field>
                          </>
                        )}
                      />

                      <Controller
                        name="code"
                        control={control}
                        defaultValue={String(product?.code || nextProductCode)}
                        rules={{ required: true }}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <Field
                              label="Code"
                              validationState={error ? "error" : "none"}
                              validationMessage={error?.message}>
                              <Input
                                autoComplete="nope"
                                size="large"
                                {...field}
                                readOnly
                              />
                            </Field>
                          </>
                        )}
                      />

                      <Controller
                        name="salePrice"
                        control={control}
                        defaultValue={String(product?.salePrice) || "0"}
                        rules={{ required: true }}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <Field
                              label="Prix unitaire de revente"
                              validationState={error ? "error" : "none"}
                              validationMessage={error?.message}>
                              <Input
                                autoComplete="nope"
                                size="large"
                                {...field}
                                type="number"
                              />
                            </Field>
                          </>
                        )}
                      />
                    </Col>
                    <Col>
                      <ImageUpload
                        img={product?.imgUrl || ProductPlaceHolder}
                        Trigger={<Link>Uploader une image</Link>}
                        setFile={setFile}
                      />
                    </Col>
                  </TwoCols>
                </FormWrap>
              </DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button
                    appearance="secondary"
                    size="large"
                    onClick={onCancel}>
                    Annuler
                  </Button>
                </DialogTrigger>
                <Button
                  appearance="primary"
                  type="submit"
                  size="large"
                  disabled={!isValid}>
                  Valider
                </Button>
              </DialogActions>
            </DialogBody>
          </form>
        </DialogSurface>
      </Dialog>
    </>
  );
};

const PromoButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      {...props}
      appearance="transparent"
      size="medium"
      style={{
        minWidth: "auto",
      }}
    >
      🔖
    </Button>
  );
};