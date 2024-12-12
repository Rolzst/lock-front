import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import PropTypes from "prop-types";

function ItemNavbar({trigger, links}) {

    return (
        <Menu as="div" className="relative ml-3">
            <div>
                <MenuButton className="relative flex max-w-xs items-center rounded-full
                                             text-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
                                             focus:ring-offset-gray-800">
                    {trigger}
                </MenuButton>
            </div>

            <MenuItems
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1
                ring-black/5 transition focus:outline-none">
                {
                    links.map((link) => {
                        return (
                            <MenuItem key={link?.name}><a
                                href={link?.href + trigger.toLowerCase()}
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none">
                                {link?.name}
                            </a>
                            </MenuItem>)
                    })
                }
            </MenuItems>

        </Menu>
    );
}

ItemNavbar.propTypes = {
    trigger: PropTypes.string.isRequired,
    links: PropTypes.any,
}

export default ItemNavbar;
