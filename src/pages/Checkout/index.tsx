import { useState } from 'react'
import Button from '../../components/Button'
import Card from '../../components/Card'
import { InputGroup, Row, TabButton } from './styles'
import boleto from '../../assets/images/boleto.png'
import cartao from '../../assets/images/cartao.png'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { usePurchaseMutation } from '../../services/api'

const Checkout = () => {
  const [payWithCard, setPayWithCard] = useState(false)
  const [purchase, { isLoading, isError, data, isSuccess }] =
    usePurchaseMutation()

  const form = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      cpf: '',
      deliveryEmail: '',
      confirmDeliveryEmail: '',
      cardOwner: '',
      cpfCardOwner: '',
      cardDisplayName: '',
      cardNumber: '',
      expiresMonth: '',
      expiresYear: '',
      cardCode: '',
      installments: 1
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .min(5, 'O nome precisa ter pelo menos 5 caracteres')
        .required('O campo é obrigatorio'),
      email: Yup.string()
        .min(5, 'O E-mail é inválido')
        .required('O campo é obrigatorio'),
      cpf: Yup.string()
        .min(12, 'Caracteres faltantes')
        .max(14, 'Excedendo o limite de caracteres')
        .required('O campo é obrigatorio'),
      deliveryEmail: Yup.string()
        .min(5, 'O E-mail é inválido')
        .required('O campo é obrigatorio'),
      confirmDeliveryEmail: Yup.string()
        .oneOf(
          [Yup.ref('deliveryEmail')],
          'Os endereços de e-mail são diferentes'
        )
        .required('O campo é obrigatório'),

      cardOwner: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatorio') : schema
      ),
      cpfCardOwner: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatorio') : schema
      ),
      cardDisplayName: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatorio') : schema
      ),
      cardNumber: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatorio') : schema
      ),
      expiresMonth: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatorio') : schema
      ),
      expiresYear: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatorio') : schema
      ),
      cardCode: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatorio') : schema
      ),
      installments: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatorio') : schema
      )
    }),
    onSubmit: (values) => {
      purchase({
        billing: {
          document: values.cpf,
          email: values.email,
          name: values.fullName
        },
        delivery: {
          email: values.deliveryEmail
        },
        payment: {
          installments: 1,
          card: {
            active: payWithCard,
            code: Number(values.cardCode),
            name: values.cardDisplayName,
            number: values.cardNumber,
            owner: {
              document: values.cpfCardOwner,
              name: values.cardOwner
            },
            expires: {
              month: 1,
              year: 2024
            }
          }
        },
        products: [
          {
            id: 1,
            price: 10
          }
        ]
      })
    }
  })

  const getErrorMessage = (fieldName: string, message?: string) => {
    const hasChanged = fieldName in form.touched
    const isInvalid = fieldName in form.errors

    if (hasChanged && isInvalid) return message
    return ''
  }

  return (
    <div className="container">
      {isSuccess ? (
        <Card title="Muito obrigado">
          <>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
              enim quaerat suscipit eum molestias tenetur, libero quod,
              quibusdam aperiam unde cupiditate nisi, est non similique
              explicabo ipsum earum repellat sit. <br />
              Número do pedido: {data.orderId} <br />
              Forma de Pagamento:{' '}
              {payWithCard ? 'Cartão de Crédito' : 'Boleto Bancário'}
            </p>
            <p className="margin-top">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
              enim quaerat suscipit eum molestias tenetur.
            </p>
            <p className="margin-top">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
              enim quaerat suscipit eum molestias tenetur, libero quod.
            </p>
            <p className="margin-top">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </>
        </Card>
      ) : (
        <form onSubmit={form.handleSubmit}>
          <Card title="dados de cobrança">
            <>
              <Row>
                <InputGroup>
                  <label htmlFor="fullName">Nome completo</label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.fullName}
                  />
                  <small>
                    {getErrorMessage('fullName', form.errors.fullName)}
                  </small>
                </InputGroup>
                <InputGroup>
                  <label htmlFor="email">E-mail</label>
                  <input
                    id="email"
                    type="email"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.email}
                    name="email"
                  />
                  <small>{getErrorMessage('email', form.errors.email)}</small>
                </InputGroup>
                <InputGroup>
                  <label htmlFor="cpf">CPF</label>
                  <input
                    id="cpf"
                    type="text"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.cpf}
                    name="cpf"
                  />
                  <small>{getErrorMessage('cpf', form.errors.cpf)}</small>
                </InputGroup>
              </Row>
              <h3 className="margin-top">
                Dados de entrega - conteúdo digital
              </h3>
              <Row>
                <InputGroup>
                  <label htmlFor="deliveryEmail">E-mail</label>
                  <input
                    type="email"
                    id="deliveryEmail"
                    name="deliveryEmail"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.deliveryEmail}
                  />
                  <small>
                    {getErrorMessage(
                      'deliveryEmail',
                      form.errors.deliveryEmail
                    )}
                  </small>
                </InputGroup>
                <InputGroup>
                  <label htmlFor="confirmDeliveryEmail">
                    Confirme seu e-mail
                  </label>
                  <input
                    type="email"
                    id="confirmDeliveryEmail"
                    name="confirmDeliveryEmail"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.confirmDeliveryEmail}
                  />
                  <small>
                    {getErrorMessage(
                      'confirmDeliveryEmail',
                      form.errors.confirmDeliveryEmail
                    )}
                  </small>
                </InputGroup>
              </Row>
            </>
          </Card>
          <Card title="Pagamento">
            <>
              <TabButton
                onClick={() => setPayWithCard(false)}
                isActive={!payWithCard}
              >
                <img src={boleto} alt="Boleto" />
                Boleto bancário
              </TabButton>
              <TabButton
                onClick={() => setPayWithCard(true)}
                isActive={payWithCard}
              >
                <img src={cartao} alt="Cartão de Crédito" />
                Cartão de Crédito
              </TabButton>
              <div className="margin-top">
                {payWithCard ? (
                  <>
                    <Row>
                      <InputGroup>
                        <label htmlFor="cardOwner">
                          Nome do titular do cartão
                        </label>
                        <input
                          type="text"
                          id="cardOwner"
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          value={form.values.cardOwner}
                          name="cardOwner"
                        />
                        <small>
                          {getErrorMessage('cardOwner', form.errors.cardOwner)}
                        </small>
                      </InputGroup>
                      <InputGroup>
                        <label htmlFor="cpfCardOwner">
                          CPF do titular do cartão
                        </label>
                        <input
                          type="text"
                          id="cpfCardOwner"
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          value={form.values.cpfCardOwner}
                          name="cpfCardOwner"
                        />
                        <small>
                          {getErrorMessage(
                            'cpfCardOwner',
                            form.errors.cpfCardOwner
                          )}
                        </small>
                      </InputGroup>
                    </Row>
                    <Row marginTop="24px">
                      <InputGroup>
                        <label htmlFor="cardDisplayName">Nome no cartão</label>
                        <input
                          type="text"
                          id="cardDisplayName"
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          value={form.values.cardDisplayName}
                          name="cardDisplayName"
                        />
                        <small>
                          {getErrorMessage(
                            'cardDisplayName',
                            form.errors.cardDisplayName
                          )}
                        </small>
                      </InputGroup>
                      <InputGroup>
                        <label htmlFor="cardNumber">Número do cartão</label>
                        <input
                          type="text"
                          id="cardNumber"
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          value={form.values.cardNumber}
                          name="cardNumber"
                        />
                        <small>
                          {getErrorMessage(
                            'cardNumber',
                            form.errors.cardNumber
                          )}
                        </small>
                      </InputGroup>
                      <InputGroup maxWidth="123px">
                        <label htmlFor="expiresMonth">Mês de vencimento</label>
                        <input
                          type="text"
                          id="expiresMonth"
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          value={form.values.expiresMonth}
                          name="expiresMonth"
                        />
                        <small>
                          {getErrorMessage(
                            'expiresMonth',
                            form.errors.expiresMonth
                          )}
                        </small>
                      </InputGroup>
                      <InputGroup maxWidth="123px">
                        <label htmlFor="expiresYear">Ano de vencimento</label>
                        <input
                          type="text"
                          id="expiresYear"
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          value={form.values.expiresYear}
                          name="expiresYear"
                        />
                        <small>
                          {getErrorMessage(
                            'expiresYear',
                            form.errors.expiresYear
                          )}
                        </small>
                      </InputGroup>
                      <InputGroup maxWidth="48px">
                        <label htmlFor="cardCode">CVV</label>
                        <input
                          type="text"
                          id="cardCode"
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          value={form.values.cardCode}
                          name="cardCode"
                        />
                        <small>
                          {getErrorMessage('cardCode', form.errors.cardCode)}
                        </small>
                      </InputGroup>
                    </Row>
                    <Row marginTop="24px">
                      <InputGroup maxWidth="150px">
                        <label htmlFor="installments">Parcelamento</label>
                        <select
                          id="installments"
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          value={form.values.installments}
                          name="installments"
                        >
                          <option>1x de R$ 200,00</option>
                          <option>2x de R$ 200,00</option>
                          <option>3x de R$ 200,00</option>
                        </select>
                      </InputGroup>
                    </Row>
                  </>
                ) : (
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Exercitationem in minus natus ut consequuntur ad nobis nam
                    laborum, cumque provident! Nisi tempora, facere perferendis
                    non accusamus aut eum laborum adipisci.
                  </p>
                )}
              </div>
            </>
          </Card>
          <Button
            type="button"
            onClick={form.handleSubmit}
            title="Clique para finalizar a compra"
          >
            Finalizar compra
          </Button>
        </form>
      )}
    </div>
  )
}

export default Checkout
