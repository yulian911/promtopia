'use client'
import Image from 'next/image'
import { signOut, getProviders, signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Nav = () => {
  const { data: session } = useSession()
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  const setUpProviders = async () => {
    const response = await getProviders()

    setProviders(response)
  }

  useEffect(() => {
    setUpProviders()
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={'/'} className="flex gap-2">
        <Image
          src={'/assets/images/logo.svg'}
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      {/* desktop navigation  */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={'/create-prompt'} className="black_btn">
              Create Post
            </Link>
            <button type="button" className="outline_btn" onClick={signOut}>
              SignOut
            </button>
            <Link href={'/profile'}>
              <Image
                // src={'/assets/images/logo.svg'}
                src={session?.user.image}
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider, i) => (
                <button
                  key={i}
                  onClick={() => signIn(provider.id)}
                  type="button"
                  className="black_btn">
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile navigation  */}

      <div className="sm:hidden  flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              alt="profile"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropdown(prev => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href={'/profile'}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}>
                  My Profile
                </Link>
                <Link
                  href={'/create-prompt'}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}>
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                  }}
                  className="mt-5 w-full black_btn">
                  SignOut
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider, i) => (
                <button
                  key={i}
                  onClick={() => signIn(provider.id)}
                  type="button"
                  className="black_btn">
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
