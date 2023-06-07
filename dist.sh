#!/bin/sh -
#
# 1) start homewall jail:
#     jail -c homewall
#
# 2) Distribute this react webpack using:
#     sh dist.sh
#

builtin . /etc/shrc

_main() {
  local HERE=$( /usr/bin/dirname $( /bin/realpath "$0" ));
  local NAME=$( /usr/bin/basename "$HERE" );

  # Delete any old build directory before replacing it.
  # *TODO* change this to reflect the name of the jail.
  local JAIL_NAME=$( echo "$NAME" | /usr/bin/sed -E 's|\-web$||' )
  if [ -z "$JAIL_NAME" ] || [ "$JAIL_NAME" == "$NAME" ]; then
    errmsg "${JAIL_NAME} and ${NAME} should not be identical."; return 1;
  fi

  local JAIL_DIR="/work/systems/targets/${JAIL_NAME}"
  if [ ! -d "$JAIL_DIR" ]; then
    notdir "$JAIL_DIR"; return 1;
  fi
  local JAIL_ROOT="${JAIL_DIR}/mnt";
  if [ ! -d "$JAIL_ROOT" ]; then
    notdir "$JAIL_ROOT"; return 1;
  fi
  if is-empty-directory "$JAIL_ROOT"; then
    errmsg "The jail named ${JAIL_NAME} must be started first."; return 1;
  fi

  local WWW_DIR="${JAIL_ROOT}/usr/local/www";
  if [ ! -d "$WWW_DIR" ]; then
    errmsg "nginx doesn't appear to be installed in the ${JAIL_NAME} jail--${WWW_DIR} doesn't exist."; return 1
  fi

  # Replace /usr/local/www/homewall/
  local WEB_DIR="${WWW_DIR}/${JAIL_NAME}";
  #if [ -d "$WEB_DIR" ]; then
  #  echo "Deleting (old) ${WEB_DIR}" >> /dev/stderr
  #  /bin/rm -rf "$WEB_DIR" || return 1
  #fi
  echo "Creating ${WEB_DIR}" >> /dev/stderr;
  /bin/mkdir -p "$WEB_DIR" || return 1
  if [ ! -d "$WEB_DIR" ]; then
    notdir "$WEB_DIR"; return 1
  fi

  # Create (new) /usr/local/www/homewall/www/build/
  local DST_BUILD_DIR="${WEB_DIR}/build"
  echo "Creating ${DST_BUILD_DIR}" >> /dev/stderr
  /bin/mkdir -p "$DST_BUILD_DIR" || return 1

  # Copy /work/systems/targets/homewall-web/build/* into 
  #   /work/systems/targets/homewall/mnt/usr/local/www/homewall/build/.
  local SRC_BUILD_DIR="${HERE}/build"
  echo "Copying ${SRC_BUILD_DIR} into ${DST_BUILD_DIR}" >> /dev/stderr
  cphier "$SRC_BUILD_DIR" "$DST_BUILD_DIR" || return 1

  # Move /usr/local/www/homewall/build/express.cjs,index.html to
  #   /usr/local/www/homewall/.
  echo "Moving express.cjs from ${SRC_BUILD_DIR} to ${WEB_DIR}" >> /dev/stderr
  /bin/mv "${DST_BUILD_DIR}/express.cjs" "$WEB_DIR" || return 1

  echo "Moving index.html from ${SRC_BUILD_DIR} to ${WEB_DIR}" >> /dev/stderr
  /bin/mv "${DST_BUILD_DIR}/index.html" "$WEB_DIR" || return 1
}
_main;
