import { Switch } from '@headlessui/react'
import * as React from 'react'
import { Link } from 'react-router-dom'
// eslint-disable-next-line import/order
import * as z from 'zod'
import { Button } from 'src/components/Elements'
import { Form, InputField, SelectField } from 'src/components/Form'
import { useTeams } from 'src/features/teams'
import { useAuth } from 'src/lib/auth'

const schema = z
  .object({
    email: z.string().min(1, 'Required'),
    firstName: z.string().min(1, 'Required'),
    lastName: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required')
  })
  .and(
    z
      .object({
        teamId: z.string().min(1, 'Required')
      })
      .or(z.object({ teamName: z.string().min(1, 'Required') }))
  )

type RegisterValues = {
  firstName: string
  lastName: string
  email: string
  password: string
  teamId?: string
  teamName?: string
}

type RegisterFormProps = {
  onSuccess: () => void
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { register, isRegistering } = useAuth()
  const [chooseTeam, setChooseTeam] = React.useState(false)

  const teamsQuery = useTeams({
    config: {
      enabled: chooseTeam
    }
  })

  return (
    <div>
      <Form<RegisterValues, typeof schema>
        onSubmit={async values => {
          await register(values)
          onSuccess()
        }}
        schema={schema}
        options={{
          shouldUnregister: true
        }}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="text"
              label="First Name"
              error={formState.errors['firstName']}
              registration={register('firstName')}
            />
            <InputField
              type="text"
              label="Last Name"
              error={formState.errors['lastName']}
              registration={register('lastName')}
            />
            <InputField
              type="email"
              label="Email Address"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <InputField
              type="password"
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
            />

            <Switch.Group>
              <div className="flex items-center">
                <Switch
                  checked={chooseTeam}
                  onChange={setChooseTeam}
                  className={`${
                    chooseTeam ? 'bg-blue-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                >
                  <span
                    className={`${
                      chooseTeam ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
                <Switch.Label className="ml-4">Join Existing Team</Switch.Label>
              </div>
            </Switch.Group>

            {chooseTeam && teamsQuery.data ? (
              <SelectField
                label="Team"
                error={formState.errors['teamId']}
                registration={register('teamId')}
                // @ts-ignore
                options={teamsQuery?.data?.map(team => ({
                  label: team.name,
                  value: team.id
                }))}
              />
            ) : (
              <InputField
                type="text"
                label="Team Name"
                error={formState.errors['teamName']}
                registration={register('teamName')}
              />
            )}
            <div>
              <Button
                isLoading={isRegistering}
                type="submit"
                className="w-full"
              >
                Register
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link
            to="../login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  )
}
