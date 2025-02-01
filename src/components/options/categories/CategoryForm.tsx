import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import CategoryPlaceHolderImg from "@/assets/icons/categories.png";
import { ImageUpload } from "@/components/pos/ImageUpload";
import { CategoriesExpanded } from "@/types/expanded";
import styled from "@emotion/styled";
import {
  Button,
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

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingVerticalXL};
`;

interface FormValues {
  name: string;
}

const defaultValues: FormValues = {
  name: "",
};

interface CategoryProps {
  text: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  category?: CategoriesExpanded;
  setCategory?: Dispatch<SetStateAction<CategoriesExpanded | undefined>>;
  trigger?: ReactNode;
  onSubmitted: (data: FieldValues) => void;
  refetch: () => void;
}

export const CategoryForm: React.FC<CategoryProps> = ({
  text,
  open,
  setOpen,
  category,
  setCategory,
  trigger,
  onSubmitted,
  refetch,
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm();
  const [file, setFile] = useState<File | null>(null);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const d = Object.assign(data, file ? { image: file } : {});
      await onSubmitted(d);
      await refetch();
      setOpen(false);
      reset(category || defaultValues);
    } catch (error) {
      console.log(error);
    }
  };

  const onCancel = () => {
    reset(category || defaultValues);
    setCategory?.(undefined);
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
                  <Controller
                    name="name"
                    control={control}
                    defaultValue={category?.name || ""}
                    rules={{ required: true }}
                    render={({ field, fieldState: { error } }) => (
                      <Field
                        label="Nom"
                        validationState={error ? "error" : "none"}
                        validationMessage={error?.message}>
                        <Input autoComplete="nope" size="large" {...field} />
                      </Field>
                    )}
                  />
                  <ImageUpload
                    Trigger={<Link>Uploader une image</Link>}
                    setFile={setFile}
                    img={category?.imgUrl || CategoryPlaceHolderImg}
                  />
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
                  Ajouter
                </Button>
              </DialogActions>
            </DialogBody>
          </form>
        </DialogSurface>
      </Dialog>
    </>
  );
};
