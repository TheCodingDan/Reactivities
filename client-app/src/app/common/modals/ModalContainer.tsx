import { observer } from "mobx-react-lite";
import { Modal } from "semantic-ui-react";
import { store } from "../../stores/store";

export default observer(function ModalContainer (){
    return(
        <Modal open={store.modalStore.modal.open} onClose={store.modalStore.closeModal} size="mini">
            <Modal.Content>
                {store.modalStore.modal.body}
            </Modal.Content>
        </Modal>
    )
})