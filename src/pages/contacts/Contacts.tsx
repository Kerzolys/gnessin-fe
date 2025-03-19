import { Contacts } from "../../modules/contacts/contacts"
import { Hero } from "../../modules/hero/hero"
import { Layout } from "../../modules/layout/layout"

export const ContactsPage = () => {
    return (
        <Layout>
            <Hero />
            <Contacts />
        </Layout>
    )
}