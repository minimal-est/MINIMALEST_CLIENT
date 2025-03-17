import useFolderFlat from "../../hooks/api/useFolderFlat.tsx";
import Input from "../Input/Input.tsx";
import {useForm} from "react-hook-form";
import useFolderCreate from "../../hooks/api/useFolderCreate.tsx";
import {toast} from "react-toastify";
import {IFolderCreateRequest} from "../../interfaces/dto/IFolderCreateRequest.ts";
import {IValidationError} from "../../interfaces/dto/IValidationError.ts";
import Button from "../Button/Button.tsx";
import {IFolderView} from "../../interfaces/dto/IFolderView.ts";
import useFolderDelete from "../../hooks/api/useFolderDelete.tsx";
import {AxiosError} from "axios";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";
import {
    ErrorWrapper,
    FormWrapper,
    InputGroup,
    InputGroupWrapper,
    InputWrapper,
    LabelWrapper
} from "../Form/Form.styles.ts";
import {StyledFolder, StyledFolderList, StyledFolderListContainer} from "./FolderManager.styles.tsx";
import {StyledTextWithBackground} from "../Text/TextWithBackground.tsx";

interface Props {
    author: string;
}

const FolderManager = (props: Props) => {
    const {data: folderList, refetch: folderRefetch} = useFolderFlat(props.author);
    const {mutate: createFolder} = useFolderCreate(props.author);
    const {mutate: deleteFolder} = useFolderDelete();
    const {reset, register, handleSubmit, setError, formState: {errors}} = useForm<IFolderCreateRequest>();

    const onSubmit = (data: IFolderCreateRequest) => {
        const loadingToastId = toast.loading('폴더 생성 중 입니다..');

        createFolder(data, {
            onSuccess: () => {
                toast.update(loadingToastId, {
                    render: '폴더 생성 성공!',
                    type: 'success',
                    isLoading: false,
                    autoClose: 3000,
                });

                folderRefetch();
                reset();
            },

            onError: (error) => {
                let message = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';

                if (error.response) {
                    message = error.response?.data.message
                }

                if (error.status === 400) {
                    if (error.response) {
                        const data = error.response.data;
                        message = data.message;
                        const validationErrors = data['data'];
                        validationErrors?.forEach((error: IValidationError) => {
                            setError(error.field as keyof IFolderCreateRequest, {
                                type: 'manual',
                                message: error.message,
                            });
                        });
                    }
                }

                toast.update(loadingToastId, {
                    render: message,
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                })
            }
        })
    }

    const onDelete = (folderId: number) => {
        const loadingToastId = toast.loading('폴더 삭제 중 입니다..');

        deleteFolder({author: props.author, folderId: folderId}, {
            onSuccess: () => {
                toast.update(loadingToastId, {
                    render: '폴더 삭제 성공!',
                    type: 'success',
                    isLoading: false,
                    autoClose: 3000,
                });

                folderRefetch();

            },

            onError: (error: AxiosError<IApiResponse<string>>) => {
                let message = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';

                if (error.response) {
                    message = error.response?.data.message
                }

                toast.update(loadingToastId, {
                    render: message,
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                });
            }
        })
    }

    return (
        <div>
            <FormWrapper onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <span>폴더가 삭제되더라도, 해당 폴더의 포스트는 유지됩니다. 유지되길 원치 않으시다면, 포스트 수정을 통해 폴더를 변경해야합니다.</span>
                </div>
                <InputGroupWrapper>
                    <InputGroup>
                        <LabelWrapper>
                            <label htmlFor='name'>폴더 이름</label>
                        </LabelWrapper>
                        <InputWrapper>
                            <Input {...register('name')} />
                            <ErrorWrapper>
                                {errors.name && <span>{errors.name.message}</span>}
                            </ErrorWrapper>
                        </InputWrapper>
                    </InputGroup>
                    <Button type='submit' size='small' color='black'>생성</Button>
                </InputGroupWrapper>
            </FormWrapper>

            {/* 폴더 목록 */}
            <StyledFolderListContainer>
                <h3>폴더 목록</h3>
                <StyledFolderList>
                    {folderList && folderList.map((folder: IFolderView) => (
                        <StyledFolder>
                            <StyledTextWithBackground>{folder.name}</StyledTextWithBackground>
                            <Button color='red' size='small' onClick={() => onDelete(folder.id)}>삭제</Button>
                        </StyledFolder>
                    ))}
                </StyledFolderList>
            </StyledFolderListContainer>
        </div>
    )
}

export default FolderManager;